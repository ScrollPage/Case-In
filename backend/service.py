import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton

import os
import django

from backend import local2 as local
from worker.models import Worker, TGBotCode

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

bot = telebot.TeleBot(os.environ.get('CHAT_BOT_TOKEN', local.CHAT_BOT_TOKEN))

def auth(message):
    msg = bot.send_message(message.chat.id, 'Введите код: ')
    bot.register_next_step_handler(msg, code_authorization)

def code_authorization(message):
    try:
        code = TGBotCode.objects.get(code=message.text)
    except TGBotCode.DoesNotExist:
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'Неверный код! Попробуйте авторизоваться еще раз!',
            reply_markup=menu
        )
    else:
        code.chat_id = message.chat.id
        code.save()
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            f'Авторизация выполнена! Добро пожаловать, {code.user.get_full_name()}! ',
            reply_markup=menu
        )

def get_menu(message):
    menu = types.ReplyKeyboardMarkup(True, one_time_keyboard=True)
    try:
        TGBotCode.objects.get(chat_id=message.chat.id)
    except TGBotCode.DoesNotExist:
        menu.row('Авторизация')
        menu.row('Получить иформацию', 'Наставничество')
    else:
        menu.row('Выход')
        menu.row('Получить иформацию', 'Наставничество')
        menu.row('Моя информация', 'Мероприятия')
    finally:
        return menu

def make_keyboard(items, name):
    keyboard = types.InlineKeyboardMarkup()
    for item in items:
        keyboard.add(
            types.InlineKeyboardButton(
                item, callback_data=f'{name}:{item}'
            )
        )
    return keyboard