# operator bool
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator bool() const noexcept;
```

## 概要
コルーチンハンドルが有効なコルーチンを指すかを確認する。


## 戻り値
[`address()`](address.md) `!= nullptr`


## 例外
投げない


## 例
```cpp example
#include <coroutine>
#include <iostream>

int main()
{
  std::coroutine_handle<> h;
  if (h) {
    std::cout << "valid coroutine" << std::endl;
  } else {
    std::cout << "empty coroutine" << std::endl;
  }
}
```
* if (h)[color ff0000]

### 出力
```
empty coroutine
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
