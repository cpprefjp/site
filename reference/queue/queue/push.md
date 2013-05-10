#push
```cpp
void push(const value_type& x);
void push(value_type&& x); // C++11
```

##概要

新しい要素をqueueの末尾に追加し、そのインスタンスをxのコピー、もしくはムーブして初期化する。

##引数
x: 新しい要素としてコピー、もしくはムーブする値。

##効果
const左辺値参照版： `c.push_back(x)`
右辺値参照版： `c.push_back(std::[move](/reference/utility/move.md)(x))`

##戻り値
なし

##計算量

##備考

##例
```cpp
#include <iostream>
#include <queue>

int main()
{
  std::queue<int> q;

  // 値を追加する
  q.push(10);
  q.push(20);
  q.push(30);

  // 中身の出力
  while(!q.empty()) {
    std::cout << q.front() << std::endl;
    q.pop();
  }
}
```

###出力
```
10
20
30
```

##参照

