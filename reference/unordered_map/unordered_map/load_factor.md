#load_factor(C++11)
```cpp
float load_factor() const noexcept;
```

##概要
現在の負荷率（バケットあたりの要素数の平均）を取得する。

##戻り値
現在の負荷率　:[`size`](./size.md) / [`bucket_count](./bucket_count.md) 


##例外
投げない。


##計算量
定数時間  


##例
```cpp
#include <iostream>
#include <unordered_map>

using namespace std;

int main()
{
  unordered_map<int,int> m;

  for( int n=0; n<4; n++ )
  {
    m.emplace( n, n );
  }
    
  cout << "current max_load_factor: " << m.max_load_factor() << endl;
  cout << "current size: " << m.size() << endl;
  cout << "current bucket_count: " << m.bucket_count() << endl;
  cout << "current load_factor: " << m.load_factor() << endl;				// (size / bucket_count)
  cout << endl;

  return 0;
}
```

###出力例 (MSVC-11.0)
```
current max_load_factor: 1
current size: 4
current bucket_count: 8
current load_factor: 0.5
```

###検証
[`load_factor`](./load_factor.md) = [`size`](/reference/unordered_map/size.md) / [`bucket_count](./bucket_count.md)   を満たしている。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------|-----------------------|
| [`emplace`](./emplace.md) | コンテナ内への要素の直接構築 |
| [`size`](./size.md) | 要素数の取得 |
| [`bucket_count`](./bucket_count.md) | バケット数の取得 |
| [`max_load_factor`](./max_load_factor.md) | 負荷率の最大値を取得、設定 |


