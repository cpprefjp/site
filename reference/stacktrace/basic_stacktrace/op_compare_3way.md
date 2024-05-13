# operator<=>
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template <class Allocator2>
friend bool operator<=>(const basic_stacktrace& x,
                        const basic_stacktrace<Allocator2>& y) noexcept;
```

## 概要
`basic_stacktrace`同士の等値比較を行う。


## 戻り値
```cpp
if (x.size() != y.size()) {
  return x.size() <=> y.size();
}
else {
  return lexicographical_compare_three_way(x.begin(), x.end(), y.begin(), y.end());
}
```
* size()[link size.md]
* lexicographical_compare_three_way[link /reference/algorithm/lexicographical_compare_three_way.md]
* begin()[link begin.md]
* end()[link end.md]


## 備考
- この演算子により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <stacktrace>

void g() {
  std::stacktrace a = std::stacktrace::current();
  std::stacktrace c = a;

  assert((a <=> c) == 0);
}

void f() {
  g();
}

int main() {
  f();
}
```
* current()[link current.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [Hidden Friends](/article/lib/hidden_friends.md)
