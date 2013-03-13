```cpp
atomic_flag() noexcept = default;
atomic_flag(const atomic_flag&) = delete;
```

##atomic_flagオブジェクトの構築

<b>atomic_flagクラスのデフォルトコンストラクタはデフォルト定義されるため、デフォルト構築では未初期化状態となる。</b>
<b>通常は、これらのコンストラクタの他にATOMIC_FLAG_INITマクロのためのコンストラクタが定義される。</b>


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

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


