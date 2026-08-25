# operator=
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
const locale& operator=(const locale& other) noexcept; // (1) C++98
```

## 概要
`locale`オブジェクトを代入する。


## 効果
`*this`が`other`と同じロケールを表すようにする。以降、`*this`と`other`は同じファセット集合を共有する。


## 戻り値
`*this`


## 例外
投げない。


## 例
```cpp example
#include <cassert>
#include <locale>

int main()
{
  std::locale a = std::locale::classic();
  std::locale b;

  b = a; // 代入

  assert(a == b);
}
```
* classic()[link classic.md]

### 出力
```
```


## バージョン
### 言語
- C++98


## 関連項目
- [`locale::(constructor)`](op_constructor.md)
