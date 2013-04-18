#raw_storage_iterator

| |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<br/><br/><br/>```cpp
<br/>namespace std {<br/><br/>  template <class OutputIterator, class T><br/><br/>  class raw_storage_iterator<br/><br/>    : public iterator<output_iterator_tag, void, void, void, void>;<br/><br/>}<br/><br/><br/><br/><br/><br/> |
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
|` difference_type` |` void` |
|` pointer` |` void` |
|` value_type` |` void` |
|` iterator_category` |` [output_iterator_tag](/reference/iterator/iterator_tag.md)` |
|` reference` |` void` |

###例



```cpp
```

###出力

```cpp
##バージョン
```

###言語

<li>C++11:
</li>



###参照


