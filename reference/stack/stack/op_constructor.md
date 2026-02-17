# コンストラクタ
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
// C++03まで
explicit stack(const Container& cont = Container()); // (1), (2)

// C++11以降 C++17まで
explicit stack(const Container& cont);          // (2)
explicit stack(Container&& cont = Container()); // (1), (3)

// C++20以降
stack() : stack(Container()) {}           // (1)
constexpr stack() : stack(Container()) {} // (1) C++26

explicit stack(const Container&);           // (2)
constexpr explicit stack(const Container&); // (2) C++26

explicit stack(Container&&);           // (3)
constexpr explicit stack(Container&&); // (3) C++26

template <class InputIterator>
stack(InputIterator first, InputIterator last);           // (4) C++23
template <class InputIterator>
constexpr stack(InputIterator first, InputIterator last); // (4) C++26

template <class Allocator>
explicit stack(const Allocator& alloc);           // (5) C++11
template <class Allocator>
constexpr explicit stack(const Allocator& alloc); // (5) C++26

template <class Allocator>
stack(const Container& cont, const Allocator& alloc);           // (6) C++11
template <class Allocator>
constexpr stack(const Container& cont, const Allocator& alloc); // (6) C++26

template <class Allocator>
stack(Container&& cont, const Allocator& alloc);           // (7) C++11
template <class Allocator>
constexpr stack(Container&& cont, const Allocator& alloc); // (7) C++26

template <class Allocator>
stack(const stack& st, const Allocator& alloc);           // (8) C++11
template <class Allocator>
constexpr stack(const stack& st, const Allocator& alloc); // (8) C++26

template <class Allocator>
stack(stack&& st, const Allocator& alloc);           // (9) C++11
template <class Allocator>
constexpr stack(stack&& st, const Allocator& alloc); // (9) C++26

template <class InputIterator, class Alloc>
stack(InputIterator first, InputIterator last, const Alloc&);           // (10) C++23
template <class InputIterator, class Alloc>
constexpr stack(InputIterator first, InputIterator last, const Alloc&); // (10) C++26

template <container-compatible-range<T> R>
stack(from_range_t, R&& rg);           // (11) C++23
template <container-compatible-range<T> R>
constexpr stack(from_range_t, R&& rg); // (11) C++26

template <container-compatible-range<T> R, class Alloc>
stack(from_range_t, R&& rg, const Alloc& alloc);           // (12) C++23
template <container-compatible-range<T> R, class Alloc>
constexpr stack(from_range_t, R&& rg, const Alloc& alloc); // (12) C++26
```
* from_range_t[link ../../ranges/from_range_t.md]

## 概要
- (1) : デフォルトコンストラクタ。
- (2) : 元となるコンテナのコピーを受け取るコンストラクタ。
- (3) : 元となるコンテナの一時オブジェクトをムーブで受け取るコンストラクタ。
- (4) : 元となるコンテナをイテレータペアで受け取るコンストラクタ。
- (5) : アロケータを受け取るコンストラクタ。
- (6) : 元となるコンテナのコピーとアロケータを受け取るコンストラクタ。
- (7) : 元となるコンテナの一時オブジェクトとアロケータを受け取るコンストラクタ。
- (8) : アロケータを受け取るコピーコンストラクタ。
- (9) : アロケータを受け取るムーブコンストラクタ。
- (10) : 元となるコンテナのイテレータペアとアロケータを受け取るコンストラクタ。
- (11) : 元となるRangeを受け取るコンストラクタ。
- (12) : 元となるRangeとアロケータを受け取るコンストラクタ。


## 効果
- (2) : メンバ変数`c`を`cont`のコピーで初期化する。
- (3) : メンバ変数`c`を[`std::move`](/reference/utility/move.md)`(cont)`で初期化する。
- (4) : メンバ変数`c`を2つの引数`first`, `last`で初期化する。
- (5) : メンバ変数`c`のメモリアロケートに`alloc`を使用する。
- (6) : メンバ変数`c`を`Container(cont, alloc)`で初期化する。
- (7) : メンバ変数`c`を`Container(`[`std::move`](/reference/utility/move.md)`(cont), alloc)`で初期化する。
- (8) : メンバ変数`c`を`Container(st.c, alloc)`で初期化する。
- (9) : メンバ変数`c`を`Container(`[`std::move`](/reference/utility/move.md)`(st.c), alloc)`で初期化する。
- (10) : メンバ変数`c`を3つの引数`first`, `last`, `alloc`で初期化する。
- (11) : メンバ変数`c`を`Container(from_range, rg)`で初期化する。
- (12) : メンバ変数`c`を`Container(from_range, rg, alloc)`で初期化する。


## 例
```cpp example
#include <iostream>
#include <utility>
#include <vector>
#include <stack>

int main()
{
  // デフォルトでは Container == deque<T>
  std::vector<int> v;

  // 要素を追加
  v.push_back(1);
  v.push_back(2);
  v.push_back(3);

  // vec を引数に構築
  std::stack<int, std::vector<int>> st(std::move(v));

  while (!st.empty()) {
    std::cout << st.top() << " "; // 末尾要素を参照する
    st.pop(); // 末尾要素を削除
  }
}
```
* v.push_back[link /reference/vector/vector/push_back.md]
* std::move[link /reference/utility/move.md]
* st.empty()[link empty.md]
* st.top()[link top.md]
* st.pop()[link pop.md]

### 出力
```
3 2 1 
```

## 参照
- [P0935R0 Eradicating unnecessarily explicit default constructors from the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0935r0.html)
    - C++20でのデフォルトコンストラクタの分離
- [P1425R4 Iterators pair constructors for stack and queue](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1425r4.pdf)
    - C++23でのイテレータペアへの対応
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
