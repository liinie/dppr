from space_ship_env import EnvironmentTutorial


def simple_tasks(success, env, steps, actions):

    cur_state = env.start_state
    env.board_reset()
    env.show_board()

    for i in range(steps):

        trial = str(input("try one key out!>> "))

        if ord("z") >= ord(trial) >= ord("a"):
            if trial == "e":
                print("you've got the skill to move your space ship up")
                print(f"{steps -i -1} move(s) left")
                new_state = env.step(cur_state, actions[1])
                cur_state = new_state
                board = env.env_update(cur_state)
                # env.show_board()
                if env.done(cur_state):
                    print("Well done, you made it!")
                    success = True
                    break
                print(board)

            elif trial == "t":
                print("you got the skill to move your space ship to the right")
                print(f"{steps - i - 1} move(s) left")
                new_state = env.step(cur_state, actions[0])
                cur_state = new_state
                board = env.env_update(cur_state)
                # env.show_board()
                if env.done(cur_state):
                    print("Well done, you made it!")
                    success = True
                    break
                print(board)

            else:
                print(f"error! {steps -i -1} move(s) left.")
        else:
            raise ValueError
    return success


def main():
    print(
        "try to type a key from [a-z] to find out how to control the app, you have 10 chances to move your spaceship!")
    success = False
    env = EnvironmentTutorial()

    actions = [(0, 1), (-1, 0)]  # key "e" for action (0, 1) right, key "t" for action (-1, 0) up
    # states = ((x, y) for x in range(board.shape[0]) for y in range(board.shape[1]))
    steps = 10

    simple_tasks(success, env, steps, actions)

    while not success:
        try_again = str(input("try again [y] or see the answer[n]"))
        if try_again == "y":
            success = simple_tasks(success, env, steps, actions)
            # TODO: maybe call reward for trying out new things?
        elif try_again == "n":
            print("the answer: up: e, right t")
            break
        else:
            raise ValueError

    if success:
        print("Now you can start the game!")
        # TODO: call game


if __name__ == '__main__':
    main()





