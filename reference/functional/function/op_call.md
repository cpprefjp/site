#operator() (C++11)
* functional[meta header]

```cpp
R operator()(ArgTypes... args) const;
```

##概要
関数を呼び出す。


##効果
`*this`が保持している関数ポインタまたは関数オブジェクト`f`に対して、[`INVOKE`](/reference/functional/invoke.md)`(f, std::`[`forward`](/reference/utility/forward.md)`<ArgTypes>(args)..., R)`を行う。


##戻り値
`R`型が`void`の場合は何も返さない。そうでなければ、関数呼び出しの戻り値を返す。


##例外
関数ポインタまたは関数オブジェクトを保持していない場合、[`bad_function_call`](/reference/functional/bad_function_call.md)例外を送出する。


##例
```cpp
#include <iostream>
#include <functional>

int ident(int x)
{ return x; }

int main()
{
  std::function<int(int)> f = ident;

  // 関数呼び出し : 保持しているident()関数を呼び出す
  int result = f(1);

  std::cout << result << std::endl;
}
```

###出力
```
1
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照

