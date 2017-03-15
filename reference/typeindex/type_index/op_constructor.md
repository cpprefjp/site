# コンストラクタ
* typeindex[meta header]
* std[meta namespace]
* type_index[meta class]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
type_index(const type_info& rhs) noexcept;
```

## type_indexの構築
- `type_index(const type_info& rhs) noexcept`

`type_info`オブジェクトからの構築


## 例外
投げない


## 例
```cpp
#include <cassert>
#include <typeindex>

int main()
{
  std::type_index ti = typeid(int);
  assert(ti == typeid(int));
}
```
* assert[link /reference/cassert/assert.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1

