# swap
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(tuple& rhs) noexcept(下記参照);
```

## 概要
他の`tuple`オブジェクトと中身を入れ替える。


## 要件
`tuple`の全ての要素型が`swap`可能であること。


## 効果
自身のインスタンスの全ての要素を、`rhs`の全ての要素と入れ替える


## 戻り値
なし


## 例外
`tuple`の全ての要素型が、例外を投げない`swap`を持っている場合、この関数は例外を投げない


## 例
```cpp
#include <string>
#include <tuple>
#include <cassert>

int main()
{
  std::tuple<int, char, std::string> a(1, 'a', "hello");
  std::tuple<int, char, std::string> b(2, 'b', "good-bye");

  a.swap(b);

  assert(a == std::make_tuple(2, 'b', "good-bye"));
  assert(b == std::make_tuple(1, 'a', "hello"));
}
```
* swap[color ff0000]
* assert[link /reference/cassert/assert.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp) 


## 参照


