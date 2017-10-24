# operator->
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const T* operator->() const;
constexpr T* operator->();
```

## 概要
保持している有効値のメンバにアクセスする。


## 要件
`*this`が有効な値を保持していること


## 戻り値
保持している有効値へのポインタを返す。


## 例外
投げない


## 備考
`optional`クラスはスマートポインタとしても見なせるため、この演算子のようなポインタのインタフェースを持つ。非ポインタインタフェースである[`value()`](value.md)の使用も検討するとよい。


## 例
```cpp
#include <iostream>
#include <optional>
#include <string>

int main()
{
  std::optional<std::string> p = "Hello";
  if (p) {
    std::size_t size = p->size(); // 有効値のメンバ関数を呼び出す
    std::cout << size << std::endl;
  }
}
```
* p->[color ff0000]
* size()[link /reference/string/basic_string/size.md]

### 出力
```
5
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::value()`](value.md)
