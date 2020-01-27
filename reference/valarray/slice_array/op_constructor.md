# コンストラクタ
* valarray[meta header]
* std[meta namespace]
* slice_array[meta class]
* function[meta id-type]

```cpp
private:
  slice_array();                   // (1) C++03 まで
  slice_array(const slice_array&)  // (2) C++03 まで

public:
  slice_array() = delete;          // (1) C++11 から
  slice_array(const slice_array&); // (2) C++11 から
```

## slice_arrayオブジェクトの構築
- (1) デフォルトコンストラクタ。使用不可。
- (2) コピーコンストラクタ。引数の `slice_array` と `*this` で、同じ [`valarray`](../valarray.md) オブジェクトを参照する。


## 効果
概要通り。


## 備考
- (2) このオーバー�ードには仕様がなかったため、問題を報告�(どこかに掲載されたらリンクを貼る)。
	- ここに記載している仕様は、[libstdc++のド�ュメント](https://gcc.gnu.org/onlinedocs/libstdc++/libstdc++-html-USERS-4.3/a01192.html#9282b4921811451896c581398460090d)およびlibc++とVisual C++の実装で確認できた挙動である。
- これらオーバー�ードのほかに、[`valarray`](../valarray.md) オブジェクトからスライスするためのコンストラクタが実装として用意されるが、このクラスのユーザーはそれを使用することはできない。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> va = {1, 2, 3, 4, 5, 6};

  const std::size_t start = 1u;
  const std::size_t length = 3u;
  const std::size_t stride = 2u;

  std::slice_array<int> result = va[std::slice(start, length, stride)];

  // (2)
  // copyとresultが、同じvalarrayオブジェクトを参照する
  std::slice_array<int> copy = result;

  // 抽出した要素を書き換える
  copy = 99;

  for (int x : va) {
    std::cout << x << std::endl;
  }
}
```
* std::valarray[link /reference/valarray/valarray.md]
* std::slice[link /reference/valarray/slice.md]

### 出力
```
1
99
3
99
5
99
```


## 参照
- [LWG Issue 253. valarray helper functions are almost entirely useless](https://wg21.cmeerw.net/lwg/issue253)  
	コピーコンストラクタが public に変更された経緯
