# extract
* unordered_set[meta header]
* function[meta id-type]
* std[meta namespace]
* unordered_set[meta class]
* cpp17[meta cpp]

```cpp
node_type extract(const_iterator position); (1)
node_type extract(const key_type& x);       (2)
```

## 概要
(1) `position`が指すノードを切り離し、その要素を所有する[ノードハンドル](/reference/node_handle/node_handle.md)を返す。  
(2) `x`と�価な�ーが見つかった場合、`x`が指すノードを切り離し、その要素を所有するノードハンドルを返す。それ以外の場合は空のノードハンドルを返す。


## 戻り値
要素を所有するノードハンドル。ただし、オーバー�ード(2)の場合は空のノードハンドルの可能性がある。


## 計算量
(1), (2) : 平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](size.md)`()`)）


## 備考
`extract`は、要素に対するコピーもムーブも行わずに、要素の所有権を転送することができる。
また、`extract`は、ムーブオンリーオブジェクトを`unordered_set`から取り出すことができる。

```cpp example
#include <iostream>
#include <string>
#include <unordered_set>

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
  int num = 0;
  static inline int count = 0;
  constexpr my_struct(int i) noexcept : value(i) { num = count++; };
  bool operator == (const my_struct &rhs) const noexcept {return this->value == rhs.value;}
};

// ハッシュ関数
auto my_hash = [](my_struct const& s) noexcept -> std::size_t
{
  return std::hash<int>{}(s.value);
};

int main()
{
  // ムーブオンリーな型を�ーとして扱う multiset
  std::unordered_set<my_struct, decltype(my_hash)> s;

  // 挿入
  s.insert(my_struct{1});
  s.insert(my_struct{2});
  s.insert(my_struct{3});

  // 要素を取り出す
  my_struct m = std::move(s.extract(s.begin()).value());
}
```

### 出力
```
```

## 例
```cpp example
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_set<int> s1;
  std::unordered_set<int> s2 = { 1, 2, 3 };

  // ノードを取得
  std::unordered_set<int>::node_type node = s2.extract(1);

  // 再確保なしに値を書き換える
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
s2 = { 3, 2 }
```

## バージョン
### 言語
- C++17


### 処理系
- [Clang](/implementation.md#clang): 7.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5


## 関連項目
- [node_handle](/reference/node_handle/node_handle.md)


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)

