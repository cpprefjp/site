#ctype
* locale[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class charT>
  class ctype : public locale::facet, public ctype_base;

  template <>
  class ctype<char> : public locale::facet, public ctype_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* ctype_base[link /reference/locale/ctype_base.md]

##概要
(ここに、クラスの概要を記載する)

###publicメンバ関数

| | |
|----------------------------|----------------------------------------------------------------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `is` | 文字の分類を判定する |
| `scan_is` | 文字列中の、指定した分類に該当する最初の文字を取得する |
| `scan_not` | 文字列中の、指定した分類に該当しない最初の文字を取得する |
| `toupper` | 大文字に変換する |
| `tolower` | 小文字に変換する |
| `widen` | 指定された`char`型の文字に該当する`charT`型の文字を取得する |
| `narrow` | 指定された`charT`型の文字に該当する`char`型の文字を取得する |

###静的メンバ変数

| | |
|--------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

###protectedメンバ関数

| | |
|---------------------------|----------------------------------------------------------------------------------------------------------|
| `(destructor)` | デストラクタ |
| `do_is` | 文字列中の、指定した分類に該当する最初の文字を取得する |
| `do_scan_is` | 文字列中の、指定した分類に該当する最初の文字を取得する |
| `do_scan_not` | 文字列中の、指定した分類に該当しない最初の文字を取得する |
| `do_toupper` | 大文字に変換する |
| `do_tolower` | 小文字に変換する |
| `do_widen` | 指定された`char`型の文字に該当する`charT`型の文字を取得する |
| `do_narrow` | 指定された`charT`型の文字に該当する`char`型の文字を取得する |

###メンバ型

| | |
|------------------------|------------------------------|
| `char_type` | 文字型 `charT` |

###例
```cpp
```

###出力
```
```

###参照
