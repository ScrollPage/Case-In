import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton

import os
import django

from worker.models import Worker, TGBotCode

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

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
    else:
        menu.row('Выход')
        menu.row('О компании', 'Моя информация', 'Мероприятия')
    finally:
        return menu