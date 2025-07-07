# emplace
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <class... Args>
iterator emplace(Args&&... args);
```

## 概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


## パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。


## テンプレートパラメータ制約
- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<value_type, Arg...>`が`true`であること。


## 戻り値
挿入された要素へのイテレータを返す。

## 計算量

コンテナサイズ（[`size()`](size.md)）に対して線形

## 例
### 単純な挿入の例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs;

  fs.emplace(3);
  fs.emplace(1);
  fs.emplace(4);
  fs.emplace(1);

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* emplace[color ff0000]

#### 出力
```
1
1
3
4
```

### コンストラクタ引数を渡す例
```cpp example
#include <flat_set>
#include <iostream>
#include <iterator>
#include <string>

int main()
{
  std::flat_multiset<std::string> fs;
  const char aaa[3] = {'A', 'A', 'A'};

  fs.emplace(5, 'C');
  fs.emplace(aaa, 3);
  fs.emplace("BBBB");
  fs.emplace(std::begin(aaa), std::end(aaa));

  for (const std::string& i : fs) {
    std::cout << i << std::endl;
  }
}
```
* emplace[color ff0000]
* std::begin[link /reference/iterator/begin.md]
* std::end[link /reference/iterator/end.md]

#### 出力
```
AAA
AAA
BBBB
CCCCC
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                                             | 説明                             |
|--------------------------------------------------|----------------------------------|
| [`flat_multiset::insert`](insert.md)             | 要素を挿入する                   |
| [`flat_multiset::insert_range`](insert_range.md) | Rangeを挿入する                  |
| [`flat_multiset::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |
