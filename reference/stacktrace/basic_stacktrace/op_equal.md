# operator==
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template <class Allocator2>
friend bool operator==(const basic_stacktrace& x,
                       const basic_stacktrace<Allocator2>& y) noexcept;
```

## 概要
`basic_stacktrace`同士の等値比較を行う。


## 戻り値
```cpp
return equal(x.begin(), x.end(), y.begin(), y.end());
```
* equal[link /reference/algorithm/equal.md]
* begin()[link begin.md]
* end()[link end.md]


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <stacktrace>

void g() {
  std::stacktrace a = std::stacktrace::current();
  std::stacktrace b = std::stacktrace::current();
  std::stacktrace c = a;

  assert(a == c);
  assert(a != b);
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
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [Hidden Friends](/article/lib/hidden_friends.md)
