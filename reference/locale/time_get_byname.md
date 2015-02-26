#time_get_byname
* locale[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class time_get_byname : public time_get<charT, InputIterator>;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* time_get[link /reference/locale/time_get.md]

##概要
(ここに、クラスの概要を記載する)

###publicメンバ関数

| | |
|----------------------------|-----------------------|
| `(constructor)` | コンストラクタ |

###protectedメンバ関数

| | |
|---------------------------|--------------------|
| `(destructor)` | デストラクタ |

###メンバ型

| | |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dateorder` | 日付の表記順を表す列挙型 [`time_base`](/reference/locale/time_base.md)`::dateorder` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |

###例
```cpp
```

###出力
```
```

###参照
