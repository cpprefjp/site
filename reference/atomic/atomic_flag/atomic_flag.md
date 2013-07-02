#コンストラクタ(C++11)
```cpp
atomic_flag() noexcept = default;
atomic_flag(const atomic_flag&) = delete;
```

##atomic_flagオブジェクトの構築
atomic_flagクラスのデフォルトコンストラクタはデフォルト定義されるため、デフォルト構築では未初期化状態となる。
通常は、これらのコンストラクタの他に`ATOMIC_FLAG_INIT`マクロのためのコンストラクタが定義される。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic_flag x = ATOMIC_FLAG_INIT;
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
- [Visual C++](/implementation#visual_cpp.md) ??

##参照


