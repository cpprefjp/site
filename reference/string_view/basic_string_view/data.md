# data
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_pointer data() const noexcept;
```

## 概要
文�配列表現を取得する。


## 戻り値
`*this`が保持している、参照している文�配列へのポインタを返す。


## 例外
投げない


## 備考
文�列長は[`substr()`](substr.md)メンバ関数やコンストラクタなどで変更できるが、それらは参照の範囲を限定するのみである。この関数によって返される文�配列へのポインタは、参照範囲の終端にヌル文�は挿入しないので注意すること。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv = "Hello World";
  const char* s = sv.data();
  std::cout << "a : " << s << std::endl;

  // 部分文�列
  std::string_view sv2 = sv.substr(0, 5);
  const char* s2 = sv2.data();
  std::cout << "b : " << sv2 << std::endl;
  std::cout << "c : " << s2 << std::endl; // 参照位置から全体が出力される
}
```
* data()[color ff0000]
* sv.substr[link substr.md]

### 出力
```
a : Hello World
b : Hello
c : Hello World
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
