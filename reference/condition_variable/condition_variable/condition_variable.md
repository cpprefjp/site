#コンストラクタ (C++11)
```cpp
condition_variable();
condition_variable(const condition_variable&) = delete;
```

##condition_variableオブジェクトの構築
- `condition_variable()`デフォルトコンストラクタ。<br/>`condition_variable`オブジェクトの初期化を行う
- `condition_variable(const condition_variable&) = delete`<br/>コピーコンストラクタ。コピー不可。


##例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：
- `resource_unavailable_try_again` : いくつかの非メモリリソースの制限によって初期化できない


##例
```cpp
#include <condition_variable>

int main()
{
  std::condition_variable cond;
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0
	- Visual C++ 11.0までは、delete宣言に対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。

##参照


