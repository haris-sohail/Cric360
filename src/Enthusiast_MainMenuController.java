import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Enthusiast_MainMenuController extends JFrame{
    private JButton btnSeeRequests;
    private JPanel panelMain;
    private JButton viewStatsButton;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public Enthusiast_MainMenuController() {
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Set Match Notifications");
                SetMatchNotificationsController setmatchnotifications = new SetMatchNotificationsController();
                setmatchnotifications.setContentPane(setmatchnotifications.getPanelMain());
                setmatchnotifications.setSize(400, 400);
                setmatchnotifications.setLocationRelativeTo(null);
                setmatchnotifications.setVisible(true);
                setmatchnotifications.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                dispose();
            }
        });
        viewStatsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Set Match Notifications");
                ViewStatsController viewstats = new ViewStatsController();
                viewstats.setContentPane(viewstats.getPanelMain());
                viewstats.setSize(400, 400);
                viewstats.setLocationRelativeTo(null);
                viewstats.setVisible(true);
                viewstats.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            }
        });

        leaderboardbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Show Leaderboard");
                LeaderBoardController leaderBoard_Controller_obj = new LeaderBoardController();
                leaderBoard_Controller_obj.setContentPane(leaderBoard_Controller_obj.getPanelMain());
                leaderBoard_Controller_obj.setSize(400, 400);
                leaderBoard_Controller_obj.setLocationRelativeTo(null);
                leaderBoard_Controller_obj.setVisible(true);
                leaderBoard_Controller_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Main.handleSignup();
                dispose();
            }
        });
    }

    public JPanel getPanelMain() {return panelMain;}



}
