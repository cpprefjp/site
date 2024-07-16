# swap
* any[meta header]
* std[meta namespace]
* any[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void swap(any& rhs) noexcept;
```

## 概要
他の`any`オブジェクトとデータを入れ替える。


## 効果
`*this`と`rhs`が保持しているデータを入れ替える。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <any>

int main()
{
  std::any x = 3;
  std::any y = "Hello";

  x.swap(y);

  std::cout << std::any_cast<const char*>(x) << std::endl;
  std::cout << std::any_cast<int>(y) << std::endl;
}
```
* swap[color ff0000]
* std::any_cast[link /reference/any/any_cast.md]

### 出力
```
Hello
3
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
