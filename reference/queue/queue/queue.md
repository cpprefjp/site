#コンストラクタ
```cpp
explicit queue(const Container& other = Container());

// C++11から追加されたコンストラクタ
explicit queue(Container&& other = Container());
template <class Alloc> explicit queue(const Alloc& alloc);
template <class Alloc> queue(const Container& other, const Alloc& alloc);
template <class Alloc> queue(Container&& other, const Alloc& alloc);
template <class Alloc> queue(const queue& que, const Alloc& alloc);
template <class Alloc> queue(queue&& que, const Alloc& alloc);
```

##概要

queue コンテナアダプタのオブジェクトを構築する。
コンテナアダプタは、実際にデータを保持するコンテナオブジェクトを内部に持つが、
これは引数として渡されたコンテナオブジェクトをコピー、もしくはムーブして用いる。
空のコンテナが引数として渡された場合も同様の動作を行う。

##引数

other: 初期化に用いるコンテナオブジェクト
alloc: 内部のコンテナで使用するアロケータオブジェクト
que: コピー・ムーブ元のqueueオブジェクト

##計算量
線形 O(n)。

##備考

##例
```cpp
#include <iostream>
#include <queue>
#include <deque>

int main() {
  // デフォルトでは Container == deque<T>
  std::deque<int> s;

  // データを追加する
  s.push_back(10);
  s.push_back(20);
  s.push_back(30);

  // sを引数に構築
  std::queue<int> q(std::move(s));

  // 中身の出力
  while (!q.empty()) {
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


