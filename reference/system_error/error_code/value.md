#value
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
* value[color ff0000]

###出力
```
22
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


##参照
