#what
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base::failure[meta class]

```cpp
virtual const char* what() const throw();                   // C++03 まで
```

##概要
メッセージを取得する。


##戻り値
例外を作成した際に指定されたメッセージをヌル終端文字列で返す。


##備考
一見 C++11 で `what()` が無くなっているように見えるが、[`system_error`](../../../system_error/system_error.md)`::what()` を継承しているため、メンバ関数自体は使用可能である。  
ただし、例外を作成した際に指定したメッセージと完全一致はしないので注意。


##例
```cpp
#include <iostream>

int main()
{
  std::ios_base::failure f("error message");
  std::cout << f.what() << std::endl;
}
```
* what()[color ff0000]
* failure[link ../failure.md]
* std::ios_base[link ../../ios_base.md]

###出力
```
error message
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
- GCC 5.1.0 以降では、単に C++03 モードにしても [`strcmp`](../../../cstring/strcmp.md.nolink)`(what(), msg.`[`c_str`](../../../string/basic_string/c_str.md)`()) == 0` にはならない。  
    どうしても C++03 の挙動にしたい場合には、コンパイルオプションに `-D_GLIBCXX_USE_CXX11_ABI=0` を指定する必要がある。
- Clang では、C++03 モードでも [`strcmp`](../../../cstring/strcmp.md.nolink)`(what(), msg.`[`c_str`](../../../string/basic_string/c_str.md)`()) == 0` にはならない。  


##参照
- [`failure`](op_constructor.md)
- [`exception`](../../../exception/exception.md)
- [`system_error`](../../../system_error/system_error.md)
