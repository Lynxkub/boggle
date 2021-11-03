from boggle import Boggle

from flask import Flask, render_template, session, redirect, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from unittest import TestCase

app=Flask(__name__)
app.config["SECRET_KEY"]="secret"
Debug=DebugToolbarExtension(app)
boggle_game = Boggle ()


@app.route("/")
def home_page():
    make_board=boggle_game.make_board()
    session["make_board"]=make_board
    return render_template("home.html", make_board=make_board)


@app.route("/guess_page")
def guess_page():
    game_board=session["make_board"]
    guess=request.args["guess"]
    response=boggle_game.check_valid_word(game_board, guess)

    return jsonify({"result": response})
    

@app.route("/score_page", methods=["POST"])
def score_page():
    score=request.json["score"]
    curr_high_score=session.get("high_score", 0)
    session["high_score"]= max(score,curr_high_score)
    return jsonify(new_record=score>curr_high_score)