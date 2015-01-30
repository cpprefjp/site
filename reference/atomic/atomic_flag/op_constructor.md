#コンストラクタ (C++11)
```cpp
atomic_flag() noexcept = default;
atomic_flag(const atomic_flag&) = delete;
```

##atomic_flagオブジェクトの構築
`atomic_flag`クラスのデフォルトコンストラクタはデフォルト定義されるため、デフォルト構築では未初期化状態となる。

通常は、これらのコンストラクタの他に`ATOMIC_FLAG_INIT`マクロのためのコンストラクタが定義される。このマクロを使用することで、フラグがクリアされた状態となる。


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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0
	- Visual C++ 11.0はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。

##参照


