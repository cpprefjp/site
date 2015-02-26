#コンストラクタ
* valarray[meta header]
* std[meta namespace]

```cpp
private:
  slice_array();                   // (1) C++03
  slice_array(const slice_array&)  // (2) C++03

public:
  slice_array() = delete;          // (1) C++11
  slice_array(const slice_array&); // (2) C++11
```

##slice_arrayオブジェクトの構築
- (1) デフォルトコンストラクタ。使用不可。
- (2) コピーコンストラクタ。引数の`slice_array`と`*this`で、同じ`valarray`オブジェクトを参照する。


##効果
概要通り。


##備考
- (2) このオーバーロードには仕様がなかったため、問題を報告中(どこかに掲載されたらリンクを貼る)。
	- ここに記載している仕様は、[libstdc++のドキュメント](https://gcc.gnu.org/onlinedocs/libstdc++/libstdc++-html-USERS-4.3/a01192.html#9282b4921811451896c581398460090d)およびlibc++とVisual C++の実装で確認できた挙動である。
- これらオーバーロードのほかに、`valarray`オブジェクトからスライスするためのコンストラクタが実装として用意されるが、このクラスのユーザーはそれを使用することはできない。


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> v = {1, 2, 3, 4, 5, 6};

  const std::size_t start = 1u;
  const std::size_t length = 3u;
  const std::size_t stride = 2u;

  std::slice_array<int> result = v[std::slice(start, length, stride)];

  // (2)
  // copyとresultが、同じvalarrayオブジェクトを参照する
  std::slice_array<int> copy = result;

  // 抽出した要素を書き換える
  copy = 99;

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```

###出力
```
1
99
3
99
5
99
```


