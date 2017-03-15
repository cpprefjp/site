#value
* system_error[meta header]
* std[meta namespace]
* error_code[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
int value() const noexcept;
```

##概要
包含しているエラー値を返す


##戻り値
包含しているエラー値


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  std::cout << ec.value() << std::endl;
}
```
* value()[color ff0000]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]

###出力
```
22
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
