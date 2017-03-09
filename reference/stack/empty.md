#empty
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
bool empty() const;
```

##概要
`stack` が空か否か、つまり要素数が 0 か否かを返す。

内部のコンテナの `empty()` メンバ関数を呼ぶ。


##戻り値
要素数が 0 の場合は `true `、それ以外の場合は `false` 。


##計算量
定数時間 O(1)。


##例
```cpp
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> st;

  // 空なら "empty", そうでなければ "not empty" と表示する
  if (st.empty()) {
    std::cout << "empty" << std::endl;
  } else {
    std::cout << "not empty" << std::endl;
  }

  // 要素を追加
  st.push(1);

  // 空なら "empty", そうでなければ "not empty" と表示する
  if (st.empty()) {
    std::cout << "empty" << std::endl;
  } else {
    std::cout << "not empty" << std::endl;
  }
}
```
* empty()[color ff0000]
* st.push[link push.md]

###出力
```
empty
not empty
```

##実装例

```cpp
bool empty() const { return c.empty(); }
```

##参照

| | |
|---------------------------------------------------------------------------------|-----------------------------------------------|
| [`size`](size.md) | 要素数を返す |

