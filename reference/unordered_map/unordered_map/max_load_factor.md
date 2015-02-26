#max_load_factor (C++11)
* unordered_map[meta header]

```cpp
float max_load_factor() const noexcept; // (1)
void max_load_factor(float z);          // (2)
```

##概要
- (1)	負荷率（バケットあたりの要素数の平均）の最大値を取得する。
- (2)	負荷率（バケットあたりの要素数の平均）の最大値を設定する。


##要件
`z` は正の数であること。


##効果
(1)	なし。
(2)	引数 `z` を「ヒント」として、負荷率（バケットあたりの要素数の平均）の最大値を変更する「かもしれない」。


##戻り値
(1)	負荷率（バケットあたりの要素数の平均）の最大値
(2)	なし

##例外
投げない。


##計算量
定数。


###検証
[`max_load_factor`](./max_load_factor.md) の初期値は 1.0f  

その状態では、[`bucket_count](./bucket_count.md) を超える要素を挿入した場合   
[`load_factor`](./load_factor.md) < [`max_load_factor`](./max_load_factor.md) になるよう、バケットが拡張されている  

[`max_load_factor`](./max_load_factor.md) を 大きくした場合は  
[`load_factor`](./load_factor.md) < [`max_load_factor`](./max_load_factor.md) を満たすよう  
パケットが縮小された



##例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,int> m;

  // バケット数+1個の要素生成。 load_factor > 1.0f になる。
  int c = m.bucket_count()+1;
  for( int n=0; n<c; n++ )
  {
    m.emplace( n, n );
  }

  std::cout << "current max_load_factor: " << m.max_load_factor() << std::endl;   // (1) 
  std::cout << "current size: " << m.size() << std::endl;
  std::cout << "current bucket_count: " << m.bucket_count() << std::endl;
  std::cout << "current load_factor: " << m.load_factor() << std::endl;
  std::cout  << std::endl;

  // 初期化
  m.clear();

  // max_load_factor を 上記の load_factor()より大きな値に設定する
  m.max_load_factor ( 2.5f );                       // (2)
  for( int n=0; n<c; n++ )
  {
    m.emplace( n, n );
  }

  std::cout << "new max_load_factor: " << m.max_load_factor() << std::endl; 
  std::cout << "new size: " << m.size() << std::endl;
  std::cout << "new bucket_count: " << m.bucket_count() << std::endl;
  std::cout << "new load_factor: " << m.load_factor() << std::endl;

  return 0;
}
```

###出力例(MSVC-11.0)
```
current max_load_factor: 1
current size: 9
current bucket_count: 64
current load_factor: 0.140625

new max_load_factor: 2.5
new size: 9
new bucket_count: 8
new load_factor: 1.125
```

###検証
[`max_load_factor`](./max_load_factor.md) の初期値は 1.0f  

その状態では、[`bucket_count](./bucket_count.md) を超える要素を挿入した場合   
[`load_factor`](./load_factor.md) < [`max_load_factor`](./max_load_factor.md) になるよう、バケットが拡張されている  

[`max_load_factor`](./max_load_factor.md) を 大きくした場合は  
[`load_factor`](./load_factor.md) < [`max_load_factor`](./max_load_factor.md) を満たすよう  
パケットが縮小された



##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [Clang, C++0x mode](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++0x mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 11.0

##参照

| | |
|---------------------------------------|------------|
| [`emplace`](./emplace.md) | コンテナ内への要素の直接構築 |
| [`size`](./size.md) | 要素数の取得 |
| [`bucket_count`](./bucket_count.md) | バケット数の取得 |
| [`max_load_factor`](./max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`clear`](./clear.md) | 全要素の削除 |

