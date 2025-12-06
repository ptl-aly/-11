import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================================================
// ❤️ 配置区域 - 在这里修改你的爱情回忆 ❤️
// ============================================================================
// 这里的每一块 { ... } 代表一个时间轴节点。
// 如果你想增加回忆，只需要复制一块内容，粘贴到下面即可。

interface Memory {
  date: string;   // 日期
  title: string;  // 标题
  message: string;// 详细内容
  imageUrl?: string; // 图片链接 (可选)
}

const MEMORIES: Memory[] = [
  {
    date: "2025年12月6日",
    title: "过生日啦！",
    message: "好冷，好困，好想你。居然真的20岁了，好快好不真实，离成年居然已经过了两年了。小时候一直想象不到成年后会发生什么、会面对什么毒打，但跟你在一起我感觉很幸福！",
    imageUrl: "https://i.postimg.cc/htgLNsqj/6095142739617c98134e4a77cc0eae8d.jpg"
  },
  {
    // 👇 第 1 个回忆 (请按照刚才的教程，把"Direct link"粘贴到下面的引号里)
    date: "2025年11月28日",
    title: "小缺憾",
    message: "没能一起看疯狂动物城2有点可惜，不过一起吃了冰淇淋、聊了很久的天，还是很开心。",
    // 👇👇👇 在这里粘贴你的图片链接 👇👇👇
    imageUrl: "https://i.postimg.cc/dtfbKTxg/4b047a22358c48301f00193188cbe43c.jpg" 
  },
  {
    date: "2025年11月17日",
    title: "旷课来松江",
    message: "住到了没有冷空调的酒店，看了惊天魔盗团3。我记得那天很冷，也很舍不得离去。",
    imageUrl: "https://i.postimg.cc/Fs0Bwn0L/0ae361e7adb663abae612a374fdf34fa.jpg"
  },
  {
    date: "2025年10月2日",
    title: "国庆节烤玻璃",
    message: "最艺术的叶子居然不能用在作品上，只能留在心里了。",
    imageUrl: "https://i.postimg.cc/7P12J34q/4a78b35281918f5f0c577afe1c7f8ac5.jpg"
  },
  {
    date: "2025年8月15日",
    title: "黄果树瀑布",
    message: "应该是一起经历最大的雨吧，感觉一直在淋，一直在爬，一直全是人。下山的时候我一直担心滑倒摔下去，一直让你走慢点。外面下着雨、瀑布冲着雨、洞里滴着雨，不知道这样的经历是否还会有了。",
    imageUrl: "https://i.postimg.cc/t4b5Kqz6/4f84a1148b0840ebf053dc8406fb7a56.jpg"
  },
  {
    date: "2025年8月15日",
    title: "雨中吃面",
    message: "奇奇怪怪的体验。这碗面没有我想象中那么好吃，但撑着伞吃面还是挺好玩的。",
    imageUrl: "https://i.postimg.cc/6qx02f4Y/b2b66461c2276769bd7a90877cf1b15c.jpg"
  },
  {
    date: "2025年6月27日",
    title: "羞羞",
    message: "喝酒、玩真心话大冒险；以及出现了画风转变之源",
    imageUrl: "https://i.postimg.cc/j2v7xHHW/18d919e158ac2aecfc428c866d40d0de.jpg"
  },
  {
    date: "2025年6月26日",
    title: "出发台州",
    message: "GO!GO!GO!",
    imageUrl: "https://i.postimg.cc/VvTzW517/663465de9e6dae6e018b6ee08e91dacd.jpg"
  },
  {
    date: "2025年4月19日",
    title: "看演唱会",
    message: "之后的一个月，我都靠这一天来治愈自己。",
    imageUrl: "https://i.postimg.cc/mg3GtmzW/2a6a0b976a94434a96935ab6c8be2fd8.jpg"
  },
  {
    date: "2025年3月6日",
    title: "水族馆",
    message: "完全摘下眼镜的第一次见面，很不习惯啊~",
    imageUrl: "https://i.postimg.cc/J4L8Mw03/47c7cbba86a0436fda97947efbdc447e.jpg"
  },
  {
    date: "2025年2月19日",
    title: "眼镜互换",
    message: "陪我上了一天学，爱了爱了。",
    imageUrl: "https://i.postimg.cc/K8pCKCGD/ee1c82c8d73512af54664e722fcbfc67.jpg"
  },
  {
    date: "2025年2月12日",
    title: "打毛线",
    message: "线条小狗最丑的一集。没办法，谁让你就喜欢丑的东西呢（嘻嘻）",
    imageUrl: "https://i.postimg.cc/3R5SmTPn/e3c7799a909df699eb9b6ec556745441.jpg"
  },
  {
    date: "2025年2月8日",
    title: "看哪吒2",
    message: "一起看了你“心心念念”的魔童。有想到之后会冒出那么多哪吒吗（doge",
    imageUrl: "https://i.postimg.cc/05tGqvcG/42d951ca218200209fe208b4aa75daa3.jpg"
  },
  {
    date: "2025年1月22日",
    title: "泡澡",
    message: "在帐篷里玩真心话；每次回来都会被收起来的毯子；意外出片的顺来的小灯",
    imageUrl: "https://i.postimg.cc/wjbHyW2S/39715aab631d19d741ab07f0fa6a6954.jpg"
  },
  {
    date: "2025年1月15日",
    title: "我的生日",
    message: "用补色卡各种拍照；我们俩的生日互相都忘记带礼物出来",
    imageUrl: "https://i.postimg.cc/NFT7TP1G/724243d21e641c70f8cf8fe303b5424b.jpg"
  },
  {
    date: "2024年12月1日",
    title: "拍立得",
    message: "在静安寺拍的；当天还去了愚园路、吃了奇奇怪怪的辣水果；还听了公园里一位老爷爷拉锯子。",
    imageUrl: "https://i.postimg.cc/vHBTTSdQ/71f4a4301b0cb0483a80865991222fd1.jpg"
  },
  {
    date: "2024年10月26日",
    title: "视频比心",
    message: "如果视频也算见面，那我们真是天天腻在一起呢！",
    imageUrl: "https://i.postimg.cc/zvM6DM8j/b124413d44ecc2ca0582e8b76632685c.jpg"
  },
  {
    date: "2024年10月19日",
    title: "看刘谦",
    message: "你那天穿了一件好成熟的大衣。我当时没衣服穿了，穿了件好傻的外套，还被叫上台了。",
    imageUrl: "https://i.postimg.cc/nzsc3yRw/1ba6f675165d7226232167def8e7917b.jpg"
  },
  {
    date: "2024年10月3日",
    title: "去济南",
    message: "第一次一起旅游；第一次正式骑电瓶车就载着你，真的勇啊；像傻子一样领着行李箱走完了八大局；第一次躺在一起尴尬的不知道干什么；一起看了爱心墙、玫瑰墙......",
    imageUrl: "https://i.postimg.cc/2SQYT4Qy/64ac47d1696eb5ed391eaa215cccb5a6.jpg"
  },
  {
    date: "2024年8月23日",
    title: "夹娃娃",
    message: "我开学你来找我，夹了半天换了两个玩偶。",
    imageUrl: "https://i.postimg.cc/Nj93PRRR/fef8bb740387b636ec73e0375d610b42.jpg"
  },
  {
    date: "2024年8月14日",
    title: "大头照",
    message: "从场地顺了好多东西来拍照；变了一朵有点似了的小玫瑰；玩了各种乱七八糟的东西。",
    imageUrl: "https://i.postimg.cc/C5nCVM7P/13d211f03c0ce36d62b9902871339144.jpg"
  },
  {
    date: "2024年7月26日",
    title: "第一次正式约会",
    message: "现在看来真是好尬的照片啊；有位记不住花色的小女孩；有位在台上点鸳鸯谱的魔术师。要是我这次不表白，不知道你什么时候会表露心意呢？（doge）",
    imageUrl: "https://i.postimg.cc/6QmJHzmH/d7442f5354c593b6846976ba386753ba.jpg"
  },
  // 👇 想要添加新回忆？复制上面大括号 { ... } 到这里，并修改里面的文字！
];

// ============================================================================
// ⚙️ 程序逻辑 - 下面的代码非程序员请勿修改
// ============================================================================

interface TimelineItemProps {
  data: Memory;
  index: number;
}

/**
 * 单个时间轴节点组件
 * 处理显示和动画逻辑
 */
const TimelineItem: React.FC<TimelineItemProps> = ({ data, index }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(data.imageUrl);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当元素进入视野时
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      {
        threshold: 0.15, // 稍微降低触发阈值，让手机体验更流畅
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current);
    };
  }, []);

  return (
    <li 
      ref={itemRef} 
      className={`timeline-item ${isVisible ? 'visible' : ''}`}
    >
      {/* 轴线上的爱心标记 */}
      <div className="timeline-marker">❤</div>

      {/* 内容卡片 */}
      <div className="timeline-content">
        <span className="date">{data.date}</span>
        <h3 className="title">{data.title}</h3>
        {imgSrc && (
          <img 
            src={imgSrc} 
            alt={data.title} 
            className="memory-image"
            onError={() => {
              // 图片加载失败时的替补图片
              setImgSrc("https://placehold.co/600x400/e0e0e0/888888?text=Image+Not+Found"); 
            }}
          />
        )}
        <p className="description">{data.message}</p>
      </div>
    </li>
  );
};

/**
 * 主程序组件
 */
const App = () => {
  // 使用 state 存储回忆列表，方便未来扩展
  const [memories] = useState<Memory[]>(MEMORIES);

  return (
    <>
      <header>
        <h1>大小姐生日快乐<br/>500周天纪念</h1>
        <div className="subtitle">记录我们每一次合照</div>
      </header>

      <ul className="timeline">
        {memories.map((memory, index) => (
          <TimelineItem 
            key={index} 
            data={memory} 
            index={index} 
          />
        ))}
      </ul>
      
      <footer style={{ textAlign: 'center', marginTop: '80px', color: '#888', paddingBottom: '40px' }}>
        <p>Made with Love ❤</p>
      </footer>
    </>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);