# コンストラクタ
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function[meta id-type]

```cpp
// C++03まで
explicit queue(const Container& other = Container()); // (1), (2) C++03

// C++11以降 C++17まで
explicit queue(const Container& other);          // (2) C++11
explicit queue(Container&& other = Container()); // (1), (3) C++11

// C++20以降
queue() : queue(Container()) {}           // (1) C++20
constexpr queue() : queue(Container()) {} // (1) C++26

explicit queue(const Container& other);           // (2) C++11
constexpr explicit queue(const Container& other); // (2) C++26

explicit queue(Container&& other);           // (3) C++20
constexpr explicit queue(Container&& other); // (3) C++26

template<class InputIterator>
queue(InputIterator first, InputIterator last);           // (4) C++23
template<class InputIterator>
constexpr queue(InputIterator first, InputIterator last); // (4) C++26

template <class Alloc>
explicit queue(const Alloc& alloc);           // (5) C++11
template <class Alloc>
constexpr explicit queue(const Alloc& alloc); // (5) C++26

template <class Alloc>
queue(const Container& other, const Alloc& alloc);           // (6) C++11
template <class Alloc>
constexpr queue(const Container& other, const Alloc& alloc); // (6) C++26

template <class Alloc>
queue(Container&& other, const Alloc& alloc);           // (7) C++11
template <class Alloc>
constexpr queue(Container&& other, const Alloc& alloc); // (7) C++26

template <class Alloc>
queue(const queue& que, const Alloc& alloc);           // (8) C++11
template <class Alloc>
constexpr queue(const queue& que, const Alloc& alloc); // (8) C++26

template <class Alloc>
queue(queue&& que, const Alloc& alloc);           // (9) C++11
template <class Alloc>
constexpr queue(queue&& que, const Alloc& alloc); // (9) C++26

template<class InputIterator, class Alloc>
queue(InputIterator first, InputIterator last, const Alloc&);           // (10) C++23
template<class InputIterator, class Alloc>
constexpr queue(InputIterator first, InputIterator last, const Alloc&); // (10) C++26

template <container-compatible-range<T> R>
queue(from_range_t, R&& rg);           // (11) C++23
template <container-compatible-range<T> R>
constexpr queue(from_range_t, R&& rg); // (11) C++26

template <container-compatible-range<T> R, class Alloc>
queue(from_range_t, R&& rg, const Alloc& alloc);           // (12) C++23
template <container-compatible-range<T> R, class Alloc>
constexpr queue(from_range_t, R&& rg, const Alloc& alloc); // (12) C++26
```
* from_range_t[link ../../ranges/from_range_t.md]

## 概要
`queue` コンテナアダプタのオブジェクトを構築する。 
コンテナアダプタは、実際にデータを保持するコンテナオブジェクトを内部に持つが、これは引数として渡されたコンテナオブジェクトをコピー、もしくはムーブして用いる。 
空のコンテナが引数として渡された場合も同様の動作を行う。


## 引数
`other`: 初期化に用いるコンテナオブジェクト
`alloc`: 内部のコンテナで使用するアロケータオブジェクト
`que`: コピー・ムーブ元の`queue`オブジェクト
`first`, `last`: 初期化に用いるイテレータのペア
`rg`: 初期化に用いるRange

## 計算量
線形 O(n)。


## 例
```cpp example
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
  std::queue<int> que(std::move(s));

  // 中身の出力
  while (!que.empty()) {
    std::cout << que.front() << std::endl;
    que.pop();
  }
}
```
* s.push_back[link /reference/deque/deque/push_back.md]
* std::move[link /reference/utility/move.md]
* que.empty()[link empty.md]
* que.front()[link front.md]
* que.pop()[link pop.md]

### 出力
```
10
20
30
```

## 参照
- [P0935R0 Eradicating unnecessarily explicit default constructors from the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0935r0.html)
    - C++20でのデフォルトコンストラクタの分離
- [P1425R4 Iterators pair constructors for stack and queue](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1425r4.pdf)
    - C++23でのイテレータペアへの対応
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
