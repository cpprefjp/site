#コンストラクタ
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base::failure[meta class]

```cpp
explicit failure(const string& msg);                                            // (1) C++03 まで

explicit failure(const string& msg, const error_code& ec = io_errc::stream);    // (2) C++11 から

explicit failure(const char* msg, const error_code& ec = io_errc::stream);      // (3) C++11 から
```
* string[link ../../../string/basic_string.md]
* error_code[link ../../../system_error/error_code.md]
* io_errc[link ../../io_errc.md]

##概要
[`ios_base`](../../ios_base.md)`::`[`failure`](../failure.md) オブジェクトを構築する。


##効果
- (1) [`strcmp`](../../../cstring/strcmp.md.nolink)`(`[`what`](what.md)`(), msg.`[`c_str`](../../../string/basic_string/c_str.md)`()) == 0` となる [`ios_base`](../../ios_base.md)`::`[`failure`](../failure.md) オブジェクトを構築する。
- (2)、(3) 引数 `msg` と `ec` を用いて基底クラスを構築して、[`ios_base`](../../ios_base.md)`::`[`failure`](../failure.md) オブジェクトを構築する。


##例
###C++03 までの例
```cpp
#include <iostream>

int main()
{
  std::ios_base::failure f("error message");
  std::cout << f.what() << std::endl;
}
```
* failure[link ../failure.md]
* std::ios_base[link ../../ios_base.md]
* what()[link what.md]

###出力
```
error message
```


###C++11 からの例
```cpp
#include <iostream>
#include <system_error>

int main()
{
  std::ios_base::failure f1("error message");
  std::cout << f1.what() << std::endl;
  std::ios_base::failure f2("error message", std::make_error_code(std::errc::no_such_file_or_directory));
  std::cout << f2.what() << std::endl;
}
```
* iostream[link ../../../iostream.md]
* system_error[link ../../../system_error.md]
* failure[link ../failure.md]
* make_error_code[link ../../../system_error/make_error_code.md]
* errc[link ../../../system_error/errc.md]
* cout[link ../../../iostream/cout.md]
* endl[link ../../../ostream/endl.md]
* ios_base[link ../../ios_base.md]
* what[color ff0000]

###出力例
```
error message: unspecified iostream_category error
error message: No such file or directory
```


##バージョン
##言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
- GCC 5.1.0 以降では、単に C++03 モードにしても [`strcmp`](../../../cstring/strcmp.md.nolink)`(`[`what`](what.md)`(), msg.`[`c_str`](../../../string/basic_string/c_str.md)`()) == 0` にはならない。  
    マクロ `_GLIBCXX_USE_CXX11_ABI` を `0`に設定すれば完全に C++03 の挙動になる。  
    [クラスページ](../failure.md)のバージョン欄の備考も参照。
- Clang では、C++03 モードでも [`strcmp`](../../../cstring/strcmp.md.nolink)`(`[`what`](what.md)`(), msg.`[`c_str`](../../../string/basic_string/c_str.md)`()) == 0` にはならない。  


##参照
- [`what`](what.md)
- [`exception`](../../../exception/exception.md)
- [`system_error`](../../../system_error/system_error.md)
