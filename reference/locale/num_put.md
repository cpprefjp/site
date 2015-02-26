#num_put
* locale[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class charT, class OutputIterator = ostreambuf_iterator<charT> >
  class num_put : public locale::facet;
}
```
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

##概要

(ここに、クラスの概要を記載する)

###publicメンバ関数

| | |
|----------------------------|-----------------------|
| `(constructor)` | コンストラクタ |
| `put` | 数値を出力する |

###静的メンバ変数

| | |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

###protectedメンバ関数

| | |
|---------------------------|-----------------------|
| `(destructor)` | デストラクタ |
| `do_put` | 数値を出力する |

###メンバ型

| | |
|------------------------|---------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 出力のイテレータ型 `OutputIterator` |

###例
```cpp
```

###出力
```
```

###参照
