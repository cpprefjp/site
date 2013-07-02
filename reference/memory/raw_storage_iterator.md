#raw_storage_iterator(C++11)
```cpp
namespace std {
  template <class OutputIterator, class T>
  class raw_storage_iterator
    : public iterator<output_iterator_tag, void, void, void, void>;
}
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要
(ここに、クラスの概要を記載する)


###メンバ関数

| | |
|-------------------------------------------------|-----------------------------------------------|
| `(constructor)` | コンストラクタ |
| `~raw_storage_iterator() = default;` | デストラクタ |
| `operator=` | 代入演算子 |
| `operator*` | 間接参照演算子 |
| `operator++` | イテレータをインクリメントする |


###メンバ型

| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `difference_type` | `void` |
| `pointer` | `void` |
| `value_type` | `void` |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) |
| `reference` | `void` |


###例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11:

###参照


