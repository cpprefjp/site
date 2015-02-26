#コンストラクタ (C++11)
* mutex[meta header]
* std[meta namespace]
* once_flag[meta class]
* function[meta id-type]

```cpp
constexpr once_flag() noexcept;
once_flag(const once_flag&) = delete;
```

##once_flagオブジェクトの構築
- `constexpr once_flag() noexcept;`<br/>デフォルトコンストラクタ。`once_flag`オブジェクトを初期化する。
- `once_flag(const once_flag&) = delete;`<br/>コピーコンストラクタ。コピー不可。


##例
```cpp
#include <mutex>

int main()
{
  std::once_flag once;
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
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


