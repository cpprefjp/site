# コンストラクタ
* mutex[meta header]
* std[meta namespace]
* once_flag[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr once_flag() noexcept;       // (1)
once_flag(const once_flag&) = delete; // (2)
```

## 概要
- (1) : デフォルトコンストラクタ。`once_flag`オブジェクトを初期化する。
- (2) : コピーコンストラクタ。コピー不可。


## 例
```cpp example
#include <mutex>

int main()
{
  std::once_flag once;
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
    - 11.0はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照


