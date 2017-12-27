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
