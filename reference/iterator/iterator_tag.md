#iterator tag
```cpp
namespace std {

  struct input_iterator_tag { };
  struct output_iterator_tag { };
  struct forward_iterator_tag : public input_iterator_tag { };
  struct bidirectional_iterator_tag : public forward_iterator_tag { };

  struct random_access_iterator_tag : public bidirectional_iterator_tag { };
}
```

##概要

<iterator>ヘッダでは、イテレータを分類するためのタグ(空クラス)を定義している。


| | |
|-----------------------------------------|-----------------------------------------|
| `input_iterator_tag` | 入力イテレータ |
| `output_iterator_tag` | 出力イテレータ |
| `forward_iterator_tag` | 前方イテレータ |
| `bidirectional_iterator_tag` | 双方向イテレータ |
| `random_access_iterator_tag` | ランダムアクセスイテレータ |

イテレータの関係性の定義に従い、これらのクラスは継承関係を持っている。

これらのタグは、コンパイル時にイテレータの分類を判定し、イテレータごとの最適な実装を選択するために使用される。
使用例は、[distance()](/reference/iterator/distance.md)関数の実装例を参照。

