import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
import datetime as dt
from django.utils import timezone
from django.conf import settings

import os
import django

from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from worker.models import Worker, TGBotCode
from calendly.models import CalendlyTask
from service import get_menu, bot, auth, make_keyboard
from bot_docs.texts.text import (
    IND, DESC, INDUSTRIES, AIM, STRATEGY, 
    SYSTEM, INNO, TECH, SUPERPC, RES
)

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    if 'events' in call.data:
        try:
            user = TGBotCode.objects.get(chat_id=call.message.chat.id).user
        except TGBotCode.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(
                message.chat.id, 
                'Пожалуйста, авторизуйтесь.', 
                reply_markup=menu
            )
            auth(message)
        else:
            period = call.data.split(':')[1]
            memberships = user.departments.all() \
                .select_related('depart')
            departs = [membership.depart for membership in memberships]
            queryset = CalendlyTask.objects.filter(depart__in=departs)

            if period == 'следующий день':
                end_date = datetime.now() + timedelta(days=1)
            elif period == 'следующую неделю':
                end_date = datetime.now() + timedelta(days=7)
            else:
                end_date = datetime.now() + timedelta(days=30)
            
            queryset = queryset.filter(datetime__gte=datetime.now(), datetime__lte=end_date)
            if queryset:
                res = f'Ваши ближайшие задачи {period}:\n'
                res += ''.join(
                    f'{i+1}) Отдел: {task.depart}.\n Дата: {task.datetime.date()}. Время: {task.datetime.time()}.\n Описание: {task.description.capitalize()}\n' \
                        for i, task in enumerate(queryset)
                )
            else:
                res = 'You have no nearest tasks!'
            menu = get_menu(call.message)
            bot.send_message(call.message.chat.id, res, reply_markup=menu)

    elif 'company' in call.data:
        event = call.data.split(':')[1]
        menu = get_menu(call.message)

        if event == 'О ГК Росатом.':
            bot.send_message(call.message.chat.id, DESC+IND, reply_markup=menu)
        elif event == 'Показатели деятельности.':
            bot.send_message(call.message.chat.id, INDUSTRIES, reply_markup=menu)
        else:
            l = [
                'Миссия.',
                'Стратегические цели.',
                'Ценности.',
                'Общая информация.',
                'Производственная система.',
                'Инновации'
            ]
            keyboard = make_keyboard(l, 'mission')
            bot.send_message(call.message.chat.id, AIM, reply_markup=keyboard)
    
    elif 'innovations' in call.data:
        event = call.data.split(':')[1]
        menu = get_menu(call.message)
        if event == 'Технологические платформы':
            bot.send_message(call.message.chat.id, TECH, reply_markup=menu)
        elif event == 'Суперкомпьютерные технологии':
            bot.send_message(call.message.chat.id, SUPERPC, reply_markup=menu)
        else:
            bot.send_message(call.message.chat.id, RES, reply_markup=menu)

    elif 'mission' in call.data:
        event = call.data.split(':')[1]
        menu = get_menu(call.message)
        if event == 'Миссия.':
            bot.send_message(call.message.chat.id, DESC+IND, reply_markup=menu)
        elif event == 'Стратегические цели.':
            bot.send_message(call.message.chat.id, INDUSTRIES, reply_markup=menu)
        elif event == 'Общая информация.':
            bot.send_photo(call.message.chat.id, settings.AWS_S3_CUSTOM_DOMAIN+f'/rosatom_bot/rosatom1.png')
            bot.send_photo(call.message.chat.id, settings.AWS_S3_CUSTOM_DOMAIN+f'/rosatom_bot/rosatom2.png')
            bot.send_message(call.message.chat.id, STRATEGY, reply_markup=menu)
        elif event == 'Производственная система.':
            bot.send_message(call.message.chat.id, SYSTEM, reply_markup=menu)
        else:
            l = [
                'Технологические платформы',
                'Суперкомпьютерные технологии',
                'Учет результатов.'
            ]
            keboard = make_keyboard(l, 'innovations')
            bot.send_message(call.message.chat.id, SYSTEM, reply_markup=menu)



@bot.message_handler(content_types=['text'])
def get_various_messages(message):  

    if message.text == 'Авторизация':
        try:
            code = TGBotCode.objects.get(chat_id=message.chat.id)
        except TGBotCode.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(
                message.chat.id, 
                'Пожалуйста, авторизуйтесь.', 
                reply_markup=menu
            )
            auth(message)            
        else:
            menu = get_menu(message)
            bot.send_message(
                message.chat.id, 
                f'Вы уже авторизованы, {user.get_full_name()}. Выберите одно из возможных действий на клавиатуре.',
                reply_markup=menu
            )
    
    elif message.text == 'Мероприятия':
        try:
            code = TGBotCode.objects.get(chat_id=message.chat.id)
        except TGBotCode.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(message.chat.id, 'Вы не авторизовались!', reply_markup=menu)
        else:
            user = code.user
            menu = get_menu(message)
            l = [
                'на следующий день', 
                'на следующую неделю', 
                'на следующий месяц'
            ]
            keyboard = make_keyboard(l, 'events')
            bot.send_message(
                message.chat.id,  
                'Выберите период, за который вы хотите посмотреть все мероприятия',
                reply_markup=keyboard
            )

    elif message.text == 'Получить иформацию':
        l = [
            'О ГК Росатом.', 
            'Преприятия Рсатома.', 
            'Общая информация.',
        ]
        keyboard = make_keyboard(l, 'company')
        bot.send_message(
            message.chat.id, 
            'Выберите один из возможных пунктов для получения информации.',
            reply_markup=keyboard
        )

    elif message.text == 'Моя информация':
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'pass', 
            reply_markup=menu
        )

    elif message.text == 'Выход':
        code = TGBotCode.objects.get(chat_id=message.chat.id)
        code.chat_id = None
        code.save()
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Вы успешно вышли.', reply_markup=menu)

    elif message.text == '/start':
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'Добро пожаловать! Выберите одно из доступых действий.', 
            reply_markup=menu
        )  

    else:
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'Я вас не понимаю. Выберите одно из возможных действий на клавиатуре.', 
            reply_markup=menu
        )


bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

print('We can get started!')

bot.polling(none_stop=True, interval=0)
