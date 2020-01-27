# コンストラクタ
* valarray[meta header]
* std[meta namespace]
* mask_array[meta class]
* function[meta id-type]

```cpp
private:
  mask_array();                  // (1) C++03
  mask_array(const mask_array&)  // (2) C++03

public:
  mask_array() = delete;         // (1) C++11
  mask_array(const mask_array&); // (2) C++11
```

## mask_arrayオブジェクトの構築
- (1) デフォルトコンストラクタ。使用不可。
- (2) コピーコンストラクタ。引数の `mask_array` と `*this` で、同じ [`valarray`](../valarray.md) オブジェクトを参照する。


## 効果
概要通り。


## 備考
- (2) このオーバー�ードには仕様がなかったため、問題を報告�(どこかに掲載されたらリンクを貼る)。
	- ここに記載している仕様は、[libstdc++のド�ュメント](https://gcc.gnu.org/onlinedocs/libstdc++/libstdc++-html-USERS-4.3/a01096.html#a2405f53e113d910d909a8ea84132832)およびlibc++とVisual C++の実装で確認できた挙動である。
- これらオーバー�ードのほかに、[`valarray`](../valarray.md) オブジェクトからスライスするためのコンストラクタが実装として用意されるが、このクラスのユーザーはそれを使用することはできない。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> va = {1, 2, 3, 4, 5, 6};
  std::valarray<bool> mask = {false, true, false, true, false, true};
  std::mask_array<int> result = va[mask];

  // (2)
  // copyとresultが、同じvalarrayオブジェクトを参照する
  std::mask_array<int> copy = result;

  // 抽出した要素を書き換える
  copy = 99;

  for (int x : va) {
    std::cout << x << std::endl;
  }
}
```
* std::valarray[link /reference/valarray/valarray.md]

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
