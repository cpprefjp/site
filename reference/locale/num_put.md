# num_put
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class OutputIterator = ostreambuf_iterator<charT> >
  class num_put : public locale::facet;
}
```
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要

(ここに、クラスの概要を記載する)

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| `(constructor)` | コンストラクタ |
| `put` | 数値を出力する |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|-----------------------|
| `(destructor)` | デストラクタ |
| `do_put` | 数値を出力する |

### 浮動小数点数の書式変換

`do_put`が浮動小数点数を出力するとき、[`ios_base`](/reference/ios/ios_base.md)の`floatfield`と`uppercase`の状態に応じて、以下のprintf変換指定子に相当する書式が使われる。

| 状態 | 相当するprintf変換 |
|------|--------------------|
| `floatfield == ios_base::fixed && !uppercase` | `%f` |
| `floatfield == ios_base::fixed` | `%F` |
| `floatfield == ios_base::scientific && !uppercase` | `%e` |
| `floatfield == ios_base::scientific` | `%E` |
| `floatfield == (ios_base::fixed \| ios_base::scientific) && !uppercase` | `%a` |
| `floatfield == (ios_base::fixed \| ios_base::scientific)` | `%A` |
| `!uppercase`（上記以外） | `%g` |
| （それ以外） | `%G` |

### メンバ型

| 名前 | 説明 |
|------------------------|---------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 出力のイテレータ型 `OutputIterator` |

### 例
```cpp
```

### 出力
```
```

### 参照
- [LWG Issue 4084. `std::fixed` ignores `std::uppercase`](https://cplusplus.github.io/LWG/issue4084)
    - C++26で、`floatfield == ios_base::fixed`のときに`uppercase`が設定されていれば`%F`（大文字）が使われることが明確化された（従来は`fixed`が常に`%f`で`uppercase`が無視されていた）
