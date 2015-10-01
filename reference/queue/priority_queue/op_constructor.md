#コンストラクタ
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]
* function[meta id-type]

```cpp
// C++03
priority_queue();
priority_queue(const priority_queue&);
explicit priority_queue(const Compare& x = Compare(),
                        const Container& other = Container());

template <class InputIterator>
priority_queue(InputIterator first, InputIterator last,
               const Compare& x = Compare(),
               const Container& other = Container());

// C++11
priority_queue() = default;
priority_queue(const priority_queue&) = default;

priority_queue(priority_queue&&) = default;
priority_queue(const Compare& x, const Container& other);
explicit priority_queue(const Compare& x = Compare(), Container&& other = Container());

template <class InputIterator>
priority_queue(InputIterator first, InputIterator last,
               const Compare& x, const Container& other);

template <class InputIterator>
priority_queue(InputIterator first, InputIterator last,
               const Compare& x = Compare(), Container&& other = Container());

template <class Alloc> explicit priority_queue(const Alloc& alloc);
template <class Alloc> priority_queue(const Compare& x, const Alloc& alloc);
template <class Alloc> priority_queue(const Compare& x,
                                      const Container& other, const Alloc& alloc);
template <class Alloc> priority_queue(const Compare x&,
                                      Container&& other, const Alloc& alloc);
template <class Alloc> priority_queue(const priority_queue& que, const Alloc& alloc);
template <class Alloc> priority_queue(priority_queue&& que, const Alloc& alloc);
```

##概要
C++03
- `explicit priority_queue(const Compare& x = Compare(),`<br/>                        `const Container& other = Container());`<br/>効果： メンバ変数`comp`を`x`で初期化する。メンバ変数`c`を`other`で初期化する。[`make_heap`](/reference/algorithm/make_heap.md)`(c.begin(), c.end(), comp)`を呼び出す。
- `template <class InputIterator>`<br/>`priority_queue(InputIterator first, InputIterator last,`<br/>`               const Compare& x = Compare(),`<br/>`               const Container& other = Container());`効果： メンバ変数`c`を`other`で初期化する。メンバ変数`comp`を`x`で初期化する。`c.insert(c.end(), first, last)`を呼び出す。最後に[`make_heap`](/reference/algorithm/make_heap.md)`(c.begin(), c.end(), comp)`を呼び出す。


C++11
- `priority_queue(const Compare& x, const Container& other);`<br/>`explicit priority_queue(const Compare& x = Compare(), Container&& other = Container());`<br/>効果： メンバ変数`comp`を`x`で初期化する。メンバ変数`c`を`other`で初期化する(`other`が左辺値参照であればコピー構築し、右辺値参照であればムーブ構築する)。[`make_heap`](/reference/algorithm/make_heap.md)`(c.begin(), c.end(), comp)`を呼び出す。
- `template <class InputIterator>`<br/>`priority_queue(InputIterator first, InputIterator last,`<br/>`               const Compare& x, const Container& other);`<br/>`template <class InputIterator>`<br/>`priority_queue(InputIterator first, InputIterator last,`<br/>`               const Compare& x = Compare(), Container&& other = Container());`<br/>効果： メンバ変数`comp`を`x`で初期化する。メンバ変数`c`を`other`で初期化する(`other`が左辺値参照であればコピー構築し、右辺値参照であればムーブ構築する)。<br/>`c.insert(c.end(), first, last)`を呼び出す。最後に[`make_heap`](/reference/algorithm/make_heap.md)`(c.begin(), c.end(), comp)`を呼び出す。
- `template <class Alloc> explicit priority_queue(const Alloc& alloc);`<br/>効果：メンバ変数`c`を`alloc`で初期化する。メンバ変数`comp`を値初期化する。
- `template <class Alloc> priority_queue(const Compare& x, const Alloc& alloc);`<br/>効果：メンバ変数`c`を`alloc`で初期化する。メンバ変数`comp`を`x`で初期化する。
- `template <class Alloc> priority_queue(const Compare& x,`<br/>`                                      const Container& other, const Alloc& alloc);`<br/>`template <class Alloc> priority_queue(const Compare x&,`<br/>`                                      Container&& other, const Alloc& alloc);`<br/>効果：メンバ変数`c`を第1引数`other`、第2引数`alloc`で初期化する(`other`が左辺値参照であればコピー構築し、右辺値参照であればムーブ構築する)。 最後に[`make_heap`](/reference/algorithm/make_heap.md)`(c.begin(), c.end(), comp)`を呼び出す。 
- `template <class Alloc> priority_queue(const priority_queue& que, const Alloc& alloc);`<br/>`template <class Alloc> priority_queue(priority_queue&& que, const Alloc& alloc);`<br/>効果：メンバ変数`c`を第1引数`que.c`、第2引数`alloc`で初期化する(`que`が左辺値参照であればコピー構築し、右辺値参照であればムーブ構築する)。最後に[`make_heap`](/reference/algorithm/make_heap.md)`(c.begin(), c.end(), comp)`を呼び出す。)


##要件
`Compare`型パラメータ`x`が、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)で定義されていること。


##例
```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <string>

template <class PriorityQueue>
void pop_print(const std::string& name, PriorityQueue& que)
{
  std::cout << name << " : ";
  while (!que.empty()) {
    std::cout << que.top() << ' ';
    que.pop();
  }
  std::cout << std::endl;
}

int main()
{
  // デフォルト構築
  std::priority_queue<int> que1;

  // que1からコピー構築
  std::priority_queue<int> que2 = que1;

  // que2からムーブ構築
  std::priority_queue<int> que3 = std::move(que2);

  // イテレータの範囲から構築
  const std::vector<int> v = {3, 1, 4};
  std::priority_queue<int> que4(v.begin(), v.end());

  // イテレータの範囲、比較関数オブジェクト、コンテナから構築
  const std::vector<int> v2 = {5, 2};
  std::priority_queue<int> que5(v.begin(), v.end(), {}, v2);

  pop_print("que3", que3);
  pop_print("que4", que4);
  pop_print("que5", que5);
}
```

###出力
```
que3 : 
que4 : 4 3 1 
que5 : 5 4 3 2 1 
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0(アロケータ付き初期化以外は使用可能)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


