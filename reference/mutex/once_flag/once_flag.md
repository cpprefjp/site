#コンストラクタ (C++11)
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


