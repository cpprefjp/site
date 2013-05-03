#コンストラクタ
```cpp
constexpr once_flag() noexcept;

once_flag(const once_flag&) = delete;
```

##once_flagオブジェクトの構築

<b><li><b>constexpr once_flag() noexceptデフォルトコンストラクタ。once_flagオブジェクトを初期化する。
</b></li><li><b>once_flag(const once_flag&) = deleteコピーコンストラクタ。コピー不可。
</b></li>
</b>


##例

```cpp
#include <mutex>

int main()
{
  std::once_flag once;
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

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


