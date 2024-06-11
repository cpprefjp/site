# extract
* set[meta header]
* function[meta id-type]
* std[meta namespace]
* set[meta class]
* cpp17[meta cpp]

```cpp
node_type extract(const_iterator position); // (1) C++17

node_type extract(const key_type& x);       // (2) C++17

template <class K>
node_type extract(K&& x);                   // (3) C++23
```

## 概要
指定された要素を`*this`から切り離し、その要素を所有する[ノードハンドル](/reference/node_handle/node_handle.md)を取得する。

- (1) : `position`が指すノードを切り離す
- (2) : `x`と等価なキーをもつノードを切り離す
- (3) : `key_type`と比較可能な`x`と等価なキーをもつノードを切り離す


## 戻り値
要素を所有するノードハンドル。ただし、オーバーロード(2), (3)の場合は空のノードハンドルの可能性がある。


## 計算量
- (1) : 償却定数時間
- (2), (3) : 要素数を`N`として、`log(N)`


## 備考
- この関数は、要素に対するコピーもムーブも行わずに、要素の所有権を転送することができる
- この関数は、再確保なしでマップ要素のキーを変更することができる


```cpp example
#include <iostream>
#include <set>

class noncopyable {
protected:
  constexpr noncopyable() noexcept = default;
  ~noncopyable() = default;
  constexpr noncopyable(noncopyable const &) noexcept = delete;
  constexpr noncopyable(noncopyable &&) noexcept = default;
  noncopyable & operator=(noncopyable const &) noexcept = delete;
  noncopyable & operator=(noncopyable &&) noexcept = default;
};

struct my_struct // ムーブオンリーな型
  : private noncopyable {
  int value;
  constexpr explicit my_struct(int i) noexcept : value(i) {};
  bool operator < (const my_struct &rhs) const noexcept {return this->value < rhs.value;}
};

int main()
{
  // ムーブオンリーな型をキーとして扱う set
  std::set<my_struct> s;

  // 挿入
  s.insert(my_struct{3});
  s.insert(my_struct{1});
  s.insert(my_struct{4});

  // 要素を取り出す
  my_struct m = std::move(s.extract(s.begin()).value());

  std::cout << m.value;
}
```

### 出力
```
1
```

## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int> s1;
  std::set<int> s2 = { 1, 2, 3 };

  // ノードを取得
  std::set<int>::node_type node = s2.extract(3);

  // 再確保なしに値を書き換る
  node.value() = 15;

  // ノードを転送
  s1.insert(std::move(node));

  if (s1.size() != 0) std::cout << "s1 = { ";
  else std::cout << "s1 = {}\n";

  for(auto&& itr = s1.begin(); itr != s1.end();)
    std::cout << *itr << (++itr != s1.end() ? ", " : " }\n");

  if (s2.size() != 0) std::cout << "s2 = { ";
  else std::cout << "s2 = {}\n";

  for(auto&& itr = s2.begin(); itr != s2.end();)
    std::cout << *itr << (++itr != s2.end() ? ", " : " }\n");
}
```
* extract[color ff0000]
* node_type[link /reference/node_handle/node_handle.md]
* value[link /reference/node_handle/node_handle/value.md]


### 出力
```
s1 = { 15 }
s2 = { 1, 2 }
```

## バージョン
### 言語
- C++17


### 処理系
- [Clang](/implementation.md#clang): 7.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 関連項目
- [node_handle](/reference/node_handle/node_handle.md)


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
- [P2077R3 Heterogeneous erasure overloads for associative containers](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2077r3.html)
    - C++23で、`template <class K> extract(K&& x)`のオーバーロードが追加された
