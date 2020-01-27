# match_results
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectionalIterator,
            class Allocator = allocator<sub_match<BidirectionalIterator>>>
  class match_results;

  using cmatch  = match_results<const char*>;
  using wcmatch = match_results<const wchar_t*>;
  using smatch  = match_results<string::const_iterator>;
  using wsmatch = match_results<wstring::const_iterator>;


  namespace pmr {  // C++17から
    template <class BidirectionalIterator>
      using match_results =
        std::match_results<BidirectionalIterator,
                           polymorphic_allocator<sub_match<BidirectionalIterator>>>;

    using cmatch  = match_results<const char*>;
    using wcmatch = match_results<const wchar_t*>;
    using smatch  = match_results<string::const_iterator>;
    using wsmatch = match_results<wstring::const_iterator>;
  }
}
```
* allocator[link ../memory/allocator.md]
* sub_match[link sub_match.md]
* string[link ../string/basic_string.md]
* wstring[link ../string/basic_string.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`match_results` は�規表現によるマッチ結果を格納するコンテナである。コンテナの要素はマッチ結果を表すサブマッチ（[`sub_match`](sub_match.md)）である。  
コンテナとは言っても [`regex_match`](regex_match.md) や [`regex_search`](regex_search.md) のマッチ結果を格納することを目的としているため、
一般的なコンテナのように通常の操作でコンテナに要素を格納したり変更したりすることはできない。

構築直後の `match_results` オブジェクトは結果を格納していない（[`ready`](match_results/ready.md)`() == false`）ため、ほとんどのメンバ関数は使用することができない。  
[`regex_match`](regex_match.md) や [`regex_search`](regex_search.md) に引数として渡されると、マッチが成功したか否かにかかわらずその結果を格納する（[`ready`](match_results/ready.md)`() == true`）。  
なお、[`regex_iterator`](regex_iterator.md) を間接参照した際の `match_results` オブジェクトは常にマッチ結果を格納している（[`ready`](match_results/ready.md)`() == true`）。

マッチ結果を格納した `match_results` オブジェクトは、マッチが成功した場合には 1 つ以上の要素を格納しているため、[`empty`](match_results/empty.md)`() == false` となる。  
マッチに成功し [`empty`](match_results/empty.md)`() == false` となった `match_results` オブジェクトに格納されている各要素（サブマッチ：[`sub_match`](sub_match.md)）には、標準シーケンスコンテナの [`vector`](../vector.md) �と同様に [`operator[]`](match_results/op_at.md) で直接アクセスすることができるだけでなく、
[`str`](match_results/str.md)、[`position`](match_results/position.md)、[`length`](match_results/length.md) といったメンバ関数で各要素の内容にアクセスすることもできる。  
最初の要素には、マッチした文�列全体を表すサブマッチが格納され、以降に各�ャプチャグループ（�規表現内の括弧で囲まれた部分に対応する）が続く。  
また、マッチした文�列だけでなく、マッチした文�列の前（[`prefix`](match_results/prefix.md)）、および、後（[`suffix`](match_results/suffix.md)）を指すサブマッチも保持している。
さらに、マッチした結果を用いた書式出力機能も有する（[`format`](match_results/format.md)）。

`match_results` はア�ケータ対応コンテナの要件のすべて、および、シーケンスコンテナの要件のうち�み取り専用の操作をサポートしている。  
`match_results` オブジェクトからメンバ関数で取得できるイテレータについて規格では特に言及されていないが、[`operator[]`](match_results/op_at.md) が使用できることから通常ランダムアクセスイテレータであるもの考えても差し支えないものと思われる。


## メンバ関数
### 構築・破棄

| 名前                                              | 説明           | 対応バージョン |
|---------------------------------------------------|----------------|----------------|
| [`(constructor)`](match_results/op_constructor.md) | コンストラクタ | C++11          |
| [`(destructor)`](match_results/op_destructor.md) | デストラクタ   | C++11          |
| [`operator=`](match_results/op_assign.md)         | 代入演算�     | C++11          |

### 状態

| 名前                              | 説明                       | 対応バージョン |
|-----------------------------------|----------------------------|----------------|
| [`ready`](match_results/ready.md) | 結果が利用可能か否かを返す | C++11          |

### サイズ

| 名前                                    | 説明                               | 対応バージョン |
|-----------------------------------------|------------------------------------|----------------|
| [`size`](match_results/size.md)         | サブマッチの数を返す               | C++11          |
| [`max_size`](match_results/max_size.md) | 格納できるサブマッチの最大数を返す | C++11          |
| [`empty`](match_results/empty.md)       | マッチしたか否かを返す             | C++11          |

### 要素アクセス

| 名前                                    | 説明                                               | 対応バージョン |
|-----------------------------------------|----------------------------------------------------|----------------|
| [`length`](match_results/length.md)     | 指定されたサブマッチの長さを返す                   | C++11          |
| [`position`](match_results/position.md) | 指定されたサブマッチの位置を返す                   | C++11          |
| [`str`](match_results/str.md)           | 指定されたサブマッチを文�列の形で返す             | C++11          |
| [`operator[]`](match_results/op_at.md)  | 指定されたサブマッチを返す                         | C++11          |
| [`prefix`](match_results/prefix.md)     | マッチした文�列の前の文�列を示すサブマッチを返す | C++11          |
| [`suffix`](match_results/suffix.md)     | マッチした文�列の後の文�列を示すサブマッチを返す | C++11          |
| [`begin`](match_results/begin.md)       | 先�のサブマッチを指すイテレータを取得する         | C++11          |
| [`end`](match_results/end.md)           | 末尾のサブマッチの次を指すイテレータを取得する     | C++11          |
| [`cbegin`](match_results/cbegin.md)     | 先�のサブマッチを指すイテレータを取得する         | C++11          |
| [`cend`](match_results/cend.md)         | 末尾のサブマッチの次を指すイテレータを取得する     | C++11          |

### フォーマット
| 名前                                | 説明                                                     | 対応バージョン |
|-------------------------------------|----------------------------------------------------------|----------------|
| [`format`](match_results/format.md) | `match_results` オブジェクトを書式文�列に従って出力する | C++11          |

### ア�ケータ
| 名前                                              | 説明                             | 対応バージョン |
|---------------------------------------------------|----------------------------------|----------------|
| [`get_allocator`](match_results/get_allocator.md) | ア�ケータオブジェクトを取得する | C++11          |

### 交換
| 名前                            | 説明                         | 対応バージョン |
|---------------------------------|------------------------------|----------------|
| [`swap`](match_results/swap.md) | オブジェクトの内容を交換する | C++11          |

## メンバ型

| 名前              | 説明                                                                                                                                      | 対応バージョン |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| `value_type`      | 要素の型。[`sub_match`](sub_match.md)`<BidirectionalIterator>` の別名                                                                     | C++11          |
| `const_reference` | `const` 参照の型。`const value_type&` の別名                                                                                              | C++11          |
| `reference`       | 参照の型。`value_type&` の別名（C++11 では `const value_type&` となっていたが、規格のバグとして C++14 で修�された）                      | C++11          |
| `const_iterator`  | �み取り専用イテレータの型。実装依�の型の別名                                                                                            | C++11          |
| `iterator`        | イテレータの型。`const_iterator`                                                                                                          | C++11          |
| `difference_type` | 2 つのイテレータの差の型。`typename` [`iterator_traits`](../iterator/iterator_traits.md)`<BidirectionalIterator>::difference_type` の別名 | C++11          |
| `size_type`       | `typename` [`allocator_traits`](../memory/allocator_traits.md)`<Allocator>::size_type` の別名                                             | C++11          |
| `allocator_type`  | ア�ケータオブジェクトの型。`Allocator` の別名                                                                                            | C++11          |
| `char_type`       | 文�の型。`typename` [`iterator_traits`](../iterator/iterator_traits.md)`<BidirectionalIterator>::value_type` の別名                      | C++11          |
| `string_type`     | 文�列の型。[`basic_string`](../string/basic_string.md)`<char_type>` の別名                                                               | C++11          |

## 非メンバ関数

| 名前                                          | 説明                                                | 対応バージョン |
|-----------------------------------------------|-----------------------------------------------------|----------------|
| [`operator==`](match_results/op_equal.md)     | �値比較を行う                                      | C++11          |
| [`operator!=`](match_results/op_not_equal.md) | 非�値比較を行う                                    | C++11          |
| [`swap`](match_results/swap_free.md)          | 2 つの `match_results` オブジェクトの内容を交換する | C++11          |

## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  const char s[] = "The C++11 is very cool!!";
  const std::regex re("(\\w+) is (\\w+)");

  std::cmatch m;
  if (std::regex_search(s, m, re)) {
    std::cout << "ready = " << std::boolalpha << m.ready() << ", empty = " << m.empty() << std::endl << std::endl;
    std::cout << "prefix:'" << m.prefix() << '\'' << std::endl;
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      std::cout << i << ":'" << m.str(i) << "\', position = " << m.position(i) << ", length = " << m.length(i) << std::endl;
    }
    std::cout << "suffix:'" << m.suffix() << '\'' << std::endl << std::endl;
    std::cout << m.format("$`14 is $2$'") << std::endl;
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* std::cmatch[color ff0000]
* std::regex[link basic_regex.md]
* std::regex_search[link regex_search.md]
* m.ready()[link match_results/ready.md]
* m.empty()[link match_results/empty.md]
* m.size()[link match_results/size.md]
* m.prefix()[link match_results/prefix.md]
* m.suffix()[link match_results/suffix.md]
* m.str()[link match_results/str.md]
* m.position[link match_results/position.md]
* m.length[link match_results/length.md]
* m.format[link match_results/format.md]

### 出力
```
ready = true, empty = false

prefix:'The C++'
0:'11 is very', position = 7, length = 10
1:'11', position = 7, length = 2
2:'very', position = 13, length = 4
suffix:' cool!!'

The C++14 is very cool!!
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
