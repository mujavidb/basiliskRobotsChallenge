from .robot import Robot

def find_all_path(obstacles, robots):
    pass


def lineSegmentCross(robot_a, robot_b, line_s, line_e):
    """
    This function takes 2 robot positions in x, y coordinates
    and start and end x, y coordinates of a line segment and
    returns if the intersect
    """
    denominator = (
        (robot_b.x - robot_a.x) * (line_s.y - line_e.y) -
        (robot_b.y - robot_a.y) * (line_s.x - line_e.y)
    )

    if not denominator:
        return False

    numerator_1 = (
        (robot_a.y - line_s.y) * (line_e.x - line_s.x) -
        (robot_a.x - line_s.x) * (line_e.y - line_s.y)
    )

    numerator_2 = (
        (robot_a.y - line_s.y) * (robot_b.x - robot_a.x) -
        (robot_a.x - line_a.x) * (robot_b.y - robot_a.y)
    )

    if not numerator_1 or not numerator_2:
        return False

    r, s = numerator_1 / denominator, numerator_2 / denominator

    return (r > 0 and r < 1) and (s > 0 and s < 1)


def concaveVertex()
