#explicit operator bool (C++11)
* system_error[meta header]
* std[meta namespace]
* error_code[meta class]
* function[meta id-type]

```cpp
explicit operator bool() const noexcept;
```

##概要
`error_code`オブジェクトがエラー状態であるかを判定する。 
`error_code`クラスのデフォルトエラー値である`0`が正常と見なされ、それ以外の場合はエラーと見なされる。 

`true`の場合はエラーであることを意味し、`false`の場合は正常を意味する。


##戻り値
[`value()`](./value.md)` != 0`


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>
#include <string>

void print(const std::error_code& ec)
{
  if (ec) {
    std::cout << "error! : " << ec.message() << std::endl;
  }
  else {
    std::cout << "success" << std::endl;
  }
}

int main()
{
  std::error_code err1;
  print(err1);

  std::error_code err2(static_cast<int>(std::errc::invalid_argument),
                       std::generic_category());
  print(err2);
}
```
* if (ec)[color ff0000]

###出力
```
success
error! : Invalid argument
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
