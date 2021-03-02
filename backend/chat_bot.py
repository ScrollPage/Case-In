import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
import datetime as dt
from django.utils import timezone

import os
import django

from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from worker.models import Worker, TGBotCode
from service import get_menu

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    if 'events' in call.data:
        try:
            user = TGBotCode.objects.get(chat_id=call.message.chat.id)
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

            if period == 'День':
                end_date = datetime.now() + timedelta(days=1)
            elif period == 'Неделя':
                end_date = datetime.now() + timedelta(days=7)
            else:
                end_date = datetime.now() + timedelta(days=30)
            
            queryset = queryset.filter(datetime__gte=datetiem.now(), datetime__lte=end_date)
            if queryset:
                res = 'Your nearest tasks:\n'
                res += ''.join(
                    f'{i}) You have a task in {task.depart} at {task.datetime}; {task.description.capitalize()}\n' \
                        for i, task in enumerate(queryset)
                )
            else:
                res = 'You have no nearest tasks!'
            menu = get_menu(call.message)
            bot.send_message(call.message.chat.id, res, reply_markup=menu)

    else:
        pass

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
            keyboard = types.InlineKeyboardMarkup()
            menu = get_menu(message)
            l = ['День', 'Неделя', 'Текущий Месяц']
            for period in l:
                keyboard.add(
                    types.InlineKeyboardButton(
                        f'Nearest events in {period}', callback_data=f'events:{period}'
                    )
                )
            bot.send_message(
                message.chat.id,  
                'Выберите период, за который вы хотите посмотреть все мероприятия', 
                reply_markup=keyboard
            )

    elif message.text == 'О компании':
        pass

    elif message.text == 'Моя информация'
        pass

    elif message.text == 'Выход':
        code = TGBotCode.objects.get(chat_id=message.chat.id)
        code.chat_id = None
        code.save()
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Вы успешно вышли.', reply_markup=menu)

    else:
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'Я вас не понимаю. Выберите одно из возможных действий на клавиатуре.', 
            reply_markup=menu
        )  


bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

bot.polling(none_stop=True, interval=0)